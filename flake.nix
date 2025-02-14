{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    otel-tui.url = "github:kennethhoff/flake-otel-tui";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      otel-tui,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs =
            with pkgs;
            [
              nodejs_22
              otel-tui.packages.${system}.default
            ]
            ++ (with pkgs.nodePackages; [
              pnpm_10
              typescript
              vercel
            ]);
        };
      }
    );
}
