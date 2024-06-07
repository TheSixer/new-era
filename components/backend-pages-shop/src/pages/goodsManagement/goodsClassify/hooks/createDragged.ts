import { useEffect } from 'react';
import { DropResult } from 'react-beautiful-dnd';

type Callback = (result: DropResult) => void

// 用createContext太复杂 仅局部使用 所以直接写个闭包模拟
export function createDragged() {
  const queue: {[key: string]: Callback | undefined } = {};

  function useDragged(draggableId: string, callback: Callback) {
    queue[draggableId] = callback;

    useEffect(() => {
      return () => {
        queue[draggableId] = undefined;
      }
    }, []);
  }

  function setDragged(result: DropResult) {
    const callback = queue[result.draggableId];
    if (typeof callback === 'function') {
      callback(result);
    }
  }

  return { useDragged, setDragged }
}

// 理论上不应该写在这 有多个需求时可以挪出去
export const { useDragged, setDragged } = createDragged();
