import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';
import { PAVER_PATTERNS, PAVER_TEXTURES, BORDER_STYLES, HATCH_TYPES } from '../../utils/constants';
import type { HardscapeConfig } from '../../types/calculator';

interface HardscapeFormProps {
  projectType: string;
  dimensions: {
    length: string;
    width: string;
    depth: string;
  };
  config: HardscapeConfig;
  onProjectTypeChange: (value: string) => void;
  onDimensionsChange: (dimensions: any) => void;
  onConfigChange: (config: HardscapeConfig) => void;
}

const HardscapeForm: React.FC<HardscapeFormProps> = ({
  projectType,
  dimensions,
  config,
  onProjectTypeChange,
  onDimensionsChange,
  onConfigChange
}) => {
  const updateConfig = (updates: Partial<HardscapeConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Project Type</Label>
        <Select value={projectType} onChange={onProjectTypeChange}>
          <SelectItem value="patio">Patio</SelectItem>
          <SelectItem value="walkway">Walkway</SelectItem>
          <SelectItem value="concrete-pad">Concrete Pad</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Length (ft)</Label>
          <Input
            type="number"
            value={dimensions.length}
            onChange={(e) => onDimensionsChange({ ...dimensions, length: e.target.value })}
          />
        </div>
        <div>
          <Label>Width (ft)</Label>
          <Input
            type="number"
            value={dimensions.width}
            onChange={(e) => onDimensionsChange({ ...dimensions, width: e.target.value })}
          />
        </div>
        <div>
          <Label>Depth (inches)</Label>
          <Input
            type="number"
            value={dimensions.depth}
            onChange={(e) => onDimensionsChange({ ...dimensions, depth: e.target.value })}
          />
        </div>
      </div>

      {(projectType === 'patio' || projectType === 'walkway') && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Pattern Style</Label>
              <Select
                value={config.pattern}
                onChange={(value) => updateConfig({ pattern: value as HardscapeConfig['pattern'] })}
              >
                {PAVER_PATTERNS.map(pattern => (
                  <SelectItem key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Label>Surface Texture</Label>
              <Select
                value={config.texture}
                onChange={(value) => updateConfig({ texture: value as HardscapeConfig['texture'] })}
              >
                {PAVER_TEXTURES.map(texture => (
                  <SelectItem key={texture.id} value={texture.id}>
                    {texture.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label>Border Style</Label>
            <Select
              value={config.borderStyle}
              onChange={(value) => updateConfig({ borderStyle: value as HardscapeConfig['borderStyle'] })}
            >
              {BORDER_STYLES.map(style => (
                <SelectItem key={style.id} value={style.id}>
                  {style.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Access Hatch</Label>
            <Select
              value={config.hatchType}
              onChange={(value) => updateConfig({ hatchType: value as HardscapeConfig['hatchType'] })}
            >
              {HATCH_TYPES.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </Select>

            {config.hatchType !== 'none' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hatch Width (inches)</Label>
                  <Input
                    type="number"
                    value={config.hatchSize.width}
                    onChange={(e) => updateConfig({
                      hatchSize: {
                        ...config.hatchSize,
                        width: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <Label>Hatch Length (inches)</Label>
                  <Input
                    type="number"
                    value={config.hatchSize.length}
                    onChange={(e) => updateConfig({
                      hatchSize: {
                        ...config.hatchSize,
                        length: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <Label>Location X (ft from left)</Label>
                  <Input
                    type="number"
                    value={config.hatchLocation.x}
                    onChange={(e) => updateConfig({
                      hatchLocation: {
                        ...config.hatchLocation,
                        x: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <Label>Location Y (ft from top)</Label>
                  <Input
                    type="number"
                    value={config.hatchLocation.y}
                    onChange={(e) => updateConfig({
                      hatchLocation: {
                        ...config.hatchLocation,
                        y: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HardscapeForm;