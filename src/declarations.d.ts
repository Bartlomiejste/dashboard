declare module "*.svg"
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.gif"
declare module "*.bmp"
declare module "*.tiff"
{
  const value: string;
  export default value;
}

declare module "*.scss" {
  const content: { [className: string]: string }
  export = content
}