// Update the KitchenBlockForm component
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';
import { Button } from '../ui/button';
import { BLOCK_TYPES } from '../../utils/constants';
import { Plus, Minus, Move } from 'lucide-react';

interface BlockConfig {
  id: string;
  type: string;
  quantity: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

interface KitchenBlockFormProps {
  layout: string;
  size: number;
  blocks: BlockConfig[];
  onBlocksChange: (blocks: BlockConfig[]) => void;
}

const KitchenBlockForm: React.FC<KitchenBlockFormProps> = ({
  layout,
  size,
  blocks,
  onBlocksChange
}) => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const addBlock = () => {
    const newBlock: BlockConfig = {
      id: Date.now().toString(),
      type: 'standard',
      quantity: 1,
      position: getNextBlockPosition(),
      rotation: { x: 0, y: 0, z: 0 }
    };
    onBlocksChange([...blocks, newBlock]);
  };

  const getNextBlockPosition = () => {
    if (blocks.length === 0) {
      return { x: 0, y: 0, z: 0 };
    }

    // Calculate position based on layout and existing blocks
    switch (layout) {
      case 'l-shaped':
        return blocks.length < size / 2 
          ? { x: blocks.length * 2, y: 0, z: 0 }
          : { x: size, y: 0, z: (blocks.length - size / 2) * 2 };
      case 'u-shaped':
        if (blocks.length < size / 3) {
          return { x: blocks.length * 2, y: 0, z: 0 };
        } else if (blocks.length < (size * 2) / 3) {
          return { x: size, y: 0, z: (blocks.length - size / 3) * 2 };
        } else {
          return { x: size - (blocks.length - (size * 2) / 3) * 2, y: 0, z: size };
        }
      default:
        return { x: blocks.length * 2, y: 0, z: 0 };
    }
  };

  const updateBlock = (id: string, updates: Partial<BlockConfig>) => {
    onBlocksChange(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const removeBlock = (id: string) => {
    onBlocksChange(blocks.filter(block => block.id !== id));
    if (selectedBlock === id) {
      setSelectedBlock(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {blocks.map((block) => (
          <div 
            key={block.id} 
            className={`p-4 border rounded-lg ${
              selectedBlock === block.id ? 'border-primary' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Label>Block Type</Label>
                  <Select
                    value={block.type}
                    onChange={(value) => updateBlock(block.id, { type: value })}
                  >
                    {Object.entries(BLOCK_TYPES).map(([id, data]) => (
                      <SelectItem key={id} value={id}>
                        {data.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateBlock(block.id, { 
                        quantity: Math.max(1, block.quantity - 1) 
                      })}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={block.quantity}
                      onChange={(e) => updateBlock(block.id, { 
                        quantity: parseInt(e.target.value) || 1 
                      })}
                      className="text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateBlock(block.id, { 
                        quantity: block.quantity + 1 
                      })}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedBlock(
                    selectedBlock === block.id ? null : block.id
                  )}
                >
                  <Move className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBlock(block.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={addBlock} 
        className="w-full"
        disabled={blocks.length >= getMaxBlocks()}
      >
        Add Block Row
      </Button>
    </div>
  );
};

function getMaxBlocks(): number {
  // Maximum blocks based on layout
  switch (layout) {
    case 'l-shaped':
      return Math.floor(size * 1.5);
    case 'u-shaped':
      return Math.floor(size * 2);
    case 'galley':
      return size * 2;
    default:
      return size;
  }
}

export default KitchenBlockForm;