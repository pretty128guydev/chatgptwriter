declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module 'react-draggable-resizable' {
  import React from 'react';

  interface Validator {
    propIsNumberAndGtSomeValue(value?: number): boolean;
    valueIsStringOrNumberWithDefault(values: string[], defaultValue: string, fallback?: any): boolean;
    valueMustBeInArray(values: string[]): boolean;
  }

  interface ReactDraggableResizableProps {
    active?: boolean;
    draggable?: boolean;
    resizable?: boolean;
    w?: number;  // Width
    h?: number;  // Height
    minw?: number; // Minimum width
    minh?: number; // Minimum height
    x?: number; // X position
    y?: number; // Y position
    z?: 'string' | 'number'; // String or number for z-index
    handles?: Array<string>; // Array of handles for resizing
    axis?: 'x' | 'y' | 'both'; // Restrict movement to an axis
    grid?: [number, number]; // Grid for snapping
    parent?: boolean; // Is the draggable-resizable in a parent context
    maximize?: boolean; // Should maximize functionality be enabled
    resizing?: (left: any, top: any, width: any, height: any) => void; // Callback for resizing
    activated?: (e: React.MouseEvent, data: any) => void; // Callback when activated
    activeUpdated?: (e: React.MouseEvent, data: any) => void; // Callback when active state updates
    deactivated?: (e: React.MouseEvent, data: any) => void; // Callback when deactivated
    resizestop?: (e: React.MouseEvent, data: any) => void; // Callback when resize stops
    dragstop?: (e: React.MouseEvent, data: any) => void; // Callback when drag stops
    dragging?: (left: any, top: any) => void; // Callback while dragging
    style?: React.CSSProperties; // Additional styles
    children?: React.ReactNode; // Child elements
  }

  export default class ReactDraggableResizable extends React.Component<ReactDraggableResizableProps> { }
}

