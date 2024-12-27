declare module 'react-beautiful-dnd' {
    import * as React from 'react';

    export interface DropResult {
        draggableId: string;
        type: string;
        source: {
            index: number;
            droppableId: string;
        };
        destination?: {
            index: number;
            droppableId: string;
        };
        reason?: 'DROP' | 'CANCEL';
    }

    export interface DraggableProvided {
        innerRef: (element: HTMLElement | null) => void;
        draggableProps: React.HTMLAttributes<HTMLDivElement>;
        dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
    }

    export interface DraggableProps {
        draggableId: string;
        index: number;
        children: (provided: DraggableProvided) => React.ReactNode;
    }

    export interface DroppableProvided {
        innerRef: (element: HTMLElement | null) => void;
        placeholder?: React.ReactElement;
        droppableProps: React.HTMLAttributes<HTMLDivElement>;
    }

    export interface DroppableProps {
        droppableId: string;
        children: (provided: DroppableProvided) => React.ReactNode;
        direction?: 'horizontal' | 'vertical';
        isDropDisabled?: boolean;
        type?: string;
    }

    export interface DragDropContextProps {
        onDragEnd: (result: DropResult) => void;
        onDragStart?: (initial: any) => void;
        onDragUpdate?: (initial: any) => void;
        children: React.ReactNode;
    }

    export const DragDropContext: React.FC<DragDropContextProps>;
    export const Droppable: React.FC<DroppableProps>;
    export const Draggable: React.FC<DraggableProps>;
}
