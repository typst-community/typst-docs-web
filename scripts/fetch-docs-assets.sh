#!/usr/bin/env bash
# Usage: fetch-docs-assets.sh [--tag TAG] [--base BASE] [--dest DEST]
# This script downloads docs.json and assets from the typst-community/dev-builds GitHub release
# and writes `public/docs.json`, `public/assets`, `public/favicon.png`, and `public/metadata.json`.

set -euo pipefail

print_usage() {
	cat <<'EOF'
Usage: fetch-docs-assets.sh [--tag TAG] [--base BASE] [--dest DEST] [--origin ORIGIN]

Environment/args:
  --tag TAG        (required) Release tag to download, e.g. v0.14.0 or latest
  --base BASE      (required) Base path used by docs, e.g. / or /docs/
  --dest DEST      (optional) Destination directory to write files (default: public)
  --origin ORIGIN  (optional) Origin URL for the deployed site, without base path (default: https://example.com/)

This script performs the following:
  - Downloads docs.json from the release tag
  - Replaces '/DOCS-BASE/' placeholder in docs.json with the provided base
  - Downloads docs-assets.zip and extracts it to destination/assets
  - Downloads favicon and writes to destination/favicon.png
  - Generates destination/metadata.json with basic deployment metadata
EOF
}

# Defaults
ORG="typst-community"
DEST="public"
ORIGIN="https://example.com/"
TAG=""
BASE=""

# Parse args
while [[ $# -gt 0 ]]; do
	case "$1" in
	--tag)
		TAG="$2"
		shift 2
		;;
	--base)
		BASE="$2"
		shift 2
		;;
	--dest)
		DEST="$2"
		shift 2
		;;
	--origin)
		ORIGIN="$2"
		shift 2
		;;
	--help | -h)
		print_usage
		exit 0
		;;
	*)
		echo "Unknown option: $1" >&2
		print_usage
		exit 2
		;;
	esac
done

if [[ -z "$TAG" || -z "$BASE" ]]; then
	echo "--tag and --base are required" >&2
	print_usage
	exit 2
fi

mkdir -p "$DEST"

# Compute VERSION like the previous CI did
if [[ "$TAG" == v* ]]; then
	VERSION="${TAG#v}"
else
	VERSION="0.dev.${TAG}"
fi

RELEASE_BASE_URL="https://github.com/${ORG}/dev-builds/releases/download/docs-${TAG}"

# Download docs.json
DOCS_URL="${RELEASE_BASE_URL}/docs.json"
echo "Fetching docs from ${DOCS_URL}"
if ! curl -sSfL "$DOCS_URL" -o "${DEST}/docs.json"; then
	echo "Failed to download docs.json from ${DOCS_URL}" >&2
	exit 3
fi

# Replace placeholder '/DOCS-BASE/' with provided base in docs.json
# Use `sd` if available, else fallback to sed
if command -v sd >/dev/null 2>&1; then
	sd '/DOCS-BASE/' "$BASE" "${DEST}/docs.json"
else
	# Use portable sed: escape slashes
	ESCAPED_BASE=$(printf '%s' "$BASE" | sed 's|/|\\/|g')
	sed -i "s/\/DOCS-BASE\//${ESCAPED_BASE}/g" "${DEST}/docs.json"
fi

# Download assets and extract
ASSETS_URL="${RELEASE_BASE_URL}/docs-assets.zip"
ASSETS_ZIP="docs-assets.zip"
if curl -sSfL "$ASSETS_URL" -o "$ASSETS_ZIP"; then
	echo "Extracting ${ASSETS_ZIP} to ${DEST}/assets"
	# Clean up existing assets if present
	rm -rf "${DEST}/assets"
	unzip -q "$ASSETS_ZIP"
	if [[ -d assets ]]; then
		mv assets "${DEST}/assets"
	else
		echo "Downloaded zip did not contain assets/ folder" >&2
		# keep build going; not necessarily fatal
	fi
	rm -f "$ASSETS_ZIP"
else
	echo "No assets ZIP was found at ${ASSETS_URL} (continuing without error)" >&2
fi

# Download favicon
FAVICON_URL="https://github.com/${ORG}/org/raw/main/design/typst-community.icon.png"
if curl -sSfL "$FAVICON_URL" -o "${DEST}/favicon.png"; then
	echo "Wrote favicon to ${DEST}/favicon.png"
else
	echo "Failed to download favicon from ${FAVICON_URL} (continuing without error)" >&2
fi

# Write metadata.json
cat >"${DEST}/metadata.json" <<EOF
{
  "\$schema": "../metadata.schema.json",
  "language": "en-US",
  "version": "${VERSION}",
  "typstOfficialUrl": "https://typst.app",
  "typstOfficialDocsUrl": "https://typst.app/docs/",
  "githubOrganizationUrl": "https://github.com/${ORG}",
  "socialLinks": [
    { "url": "https://github.com/${ORG}/typst-docs-web" },
    {
      "title": "Discord (Typst)",
      "url": "https://discord.gg/2uDybryKPe"
    }
  ],
  "originUrl": "${ORIGIN}",
  "basePath": "${BASE}",
  "displayTranslationStatus": false
}
EOF

# Done
printf '\nFetch docs assets script done.\n'

exit 0
