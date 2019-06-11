// flow-typed signature: c651f9abbe9753ef9d2ad10b80f1002d
// flow-typed version: e8047e772a/clsx_v1.x.x/flow_>=v0.30.x

declare module 'clsx' {
  declare type Classes = 
    | Array<Classes>
    | { [className: string]: * }
    | string
    | number
    | boolean
    | void
    | null;

  declare module.exports: (...classes: Array<Classes>) => string;
}
