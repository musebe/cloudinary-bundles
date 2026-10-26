# Cloudinary workflow

## Configuration

The initial demo uses the connected Cloudinary Free product environment. Only existing core upload, transformation, and delivery capabilities are used. No add-on or AI model is enabled.

The public asset registry is `src/lib/media/registry.ts`. It contains no API secret. All assets use the new `bundle-studio/v1/` public-ID namespace. This product environment uses fixed folders, so the visible folders follow that public-ID path.

## Provisioning performed

1. Verified the Free allowance with the Cloudinary MCP usage report.
2. Verified photo sources and licenses. Direct Cloudinary fetches from Wikimedia returned HTTP 429; downloaded the originals locally instead.
3. Checked that all six target public IDs were absent before uploading. The MCP signing service returned `overwrite: true` despite the false request; no existing assets were replaced because the exact target namespace was verified empty. Do not reuse that upload payload.
4. Uploaded five photographs and one plain SVG canvas with the scoped MCP signatures. No account API secret was read or copied.
5. Read all six assets back through the Cloudinary MCP and checked IDs, dimensions, format, context, and versions against the registry.
6. Rendered three fixed 1200 × 1000 WebP compositions and saved the delivered bytes, recipe, original transformation URL, timestamp, byte count, and SHA-256 digest.

## Recreate saved outputs

```bash
pnpm demo:save --confirm-core-quota
```

This operator command downloads fixed compositions from the public registry. It uses normal transformation and delivery quota. It is not a public API route, and it does not upload new assets. The seed registry must reference your own reviewed assets if you change product environments.

The first composition attempt exposed a raw-transformation encoding issue: slash characters in text labels were interpreted as transformation separators after SDK normalization. The final controlled labels use hyphens instead. Saved delivered files were inspected after the correction.

## Runtime

The application serves saved files. Selecting packages does not call Cloudinary. The health endpoint reports saved-output availability and logical contract results, not an ongoing Cloudinary API connection. No deployment credentials are needed to browse saved examples.

The export endpoint rejects stale recipes, missing files, and checksum mismatches. This binds each downloaded project copy to its saved evidence record. It is not private media access control: these educational images are intentionally public.
