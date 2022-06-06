{ pkgs }: {
    deps = [
        pkgs.nodejs
        pkgs.nodePackages.typescript
	      pkgs.ffmpeg
        pkgs.webp
        pkgs.libwebp
	      pkgs.imagemagick
	      pkgs.git
    ];
}