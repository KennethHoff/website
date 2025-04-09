# My website

This is a monorepo for all of my websites, including [Kenny's Corner](https://corner.kennethhoff.no) and my [personal website](https://kennethhoff.no)

## Prerequisite

### Nixpkgs (Recommended)

This way will automatically install all required tools needed to build, run, deploy, and otherwise work on this project.

1. Make sure the [nixpkgs](https://github.com/NixOS/nixpkgs) package manager is installed 
    * Can be installed on Mac, Linux and Windows (through WSL)
2. Run `nix develop` in the terminal. This will create a new shell session with all packages installed and added to $PATH.
    * This can be made much easier by also installing and enabling [direnv](https://github.com/direnv/direnv). This will automatically run  nix develop  in the currenly running shell, so you don't even lose history and such.

### Manual installs

This requires you to manually install the various applications.

In order to reduce maintainability burden, I recommend looking in the [Development Flake](./flake.nix) (in the `buildInputs = []` section) to figure it out on your own.
