# Build Showcase Models

Build showcase models live here as `.glb` files and are selected from build
frontmatter with a model ID.

To add a new model:

1. Export a binary `.glb` into this folder.
2. Add it to `src/lib/builds/models.ts`:

   ```ts
   myFrame: {
   	path: "/models/builds/my-frame.glb",
   	nodeName: "myFrame",
   	targetSize: BUILD_MODEL_TARGET_SIZE,
   	rotation: [Math.PI / 8, 0, 0],
   	autoRotateSpeed: BUILD_MODEL_AUTO_ROTATE_SPEED
   }
   ```

3. Use the model ID in the build `.svx` frontmatter:

   ```yaml
   model: myFrame
   ```

The renderer expects `nodeName` to point to the mesh node whose geometry should
be drawn. Keep exports in the same orientation as the existing models. The
renderer recenters the geometry and normalizes it to `targetSize`, so most
models can use `BUILD_MODEL_TARGET_SIZE`; adjust `targetSize` only if a model
needs intentional visual size tuning in the showcase. Set `rotation` to
`[x, y, z]` Euler angles in radians when a model needs a different showcase
orientation. Adjust `autoRotateSpeed` to change how fast the model spins in the
showcase.
