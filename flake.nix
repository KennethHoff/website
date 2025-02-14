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
        otel-tui-package = otel-tui.packages.${system}.default;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            pnpm_10
            typescript
            otel-tui-package
          ];
        };
      }
    );
}
