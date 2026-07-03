// This type definition is a server-side representation.
// It should be compatible with the more specific Shape type on the frontend,
// but for the server's purpose, a more generic structure is often sufficient.

type RectShape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
};

type CircleShape = {
  type: "circle";
  x: number;
  y: number;
  width: number;
  height: number;
};

type PencilShape = {
  type: "pencil";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  strokeId: string;
};

export type Shape = {
  id: string;
} & (RectShape | CircleShape | PencilShape);