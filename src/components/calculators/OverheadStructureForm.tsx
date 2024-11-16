import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { LUMBER_SIZES } from '../../utils/constants';
import type { StructureFormData } from '../../types/calculator';

interface OverheadStructureFormProps {
  form: StructureFormData;
  onChange: (form: StructureFormData) => void;
}

const OverheadStructureForm: React.FC<OverheadStructureFormProps> = ({ form, onChange }) => {
  const updateForm = (updates: Partial<StructureFormData>) => {
    onChange({ ...form, ...updates });
  };

  const updateElectrical = (key: keyof typeof form.electrical, value: number) => {
    updateForm({
      electrical: {
        ...form.electrical,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type</Label>
            <Select value={form.type} onChange={(value) => updateForm({ type: value })}>
              <SelectItem value="pergola">Pergola</SelectItem>
              <SelectItem value="pavilion">Pavilion</SelectItem>
              <SelectItem value="covered_patio">Covered Patio</SelectItem>
              <SelectItem value="arbor">Arbor</SelectItem>
            </Select>
          </div>
          <div>
            <Label>Material</Label>
            <Select value={form.material} onChange={(value) => updateForm({ material: value })}>
              <SelectItem value="cedar">Cedar</SelectItem>
              <SelectItem value="redwood">Redwood</SelectItem>
              <SelectItem value="pine">Pine</SelectItem>
              <SelectItem value="composite">Composite</SelectItem>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Length (ft)</Label>
            <Input 
              type="number" 
              value={form.length}
              onChange={(e) => updateForm({ length: e.target.value })}
            />
          </div>
          <div>
            <Label>Width (ft)</Label>
            <Input 
              type="number" 
              value={form.width}
              onChange={(e) => updateForm({ width: e.target.value })}
            />
          </div>
          <div>
            <Label>Height (ft)</Label>
            <Input 
              type="number" 
              value={form.height}
              onChange={(e) => updateForm({ height: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Lumber Sizes</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Post Size</Label>
            <Select
              value={form.postSize}
              onChange={(value) => updateForm({ postSize: value })}
            >
              {LUMBER_SIZES.posts.map(size => (
                <SelectItem key={size.nominal} value={size.nominal}>
                  {size.nominal} ({size.actual})
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Label>Beam Size</Label>
            <Select
              value={form.beamSize}
              onChange={(value) => updateForm({ beamSize: value })}
            >
              {LUMBER_SIZES.beams.map(size => (
                <SelectItem key={size.nominal} value={size.nominal}>
                  {size.nominal} ({size.actual})
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Label>Rafter Size</Label>
            <Select
              value={form.rafterSize}
              onChange={(value) => updateForm({ rafterSize: value })}
            >
              {LUMBER_SIZES.rafters.map(size => (
                <SelectItem key={size.nominal} value={size.nominal}>
                  {size.nominal} ({size.actual})
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Posts & Roofing</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Post Type</Label>
            <Select value={form.postType} onChange={(value) => updateForm({ postType: value })}>
              <SelectItem value="wood">Wood</SelectItem>
              <SelectItem value="stone_wrapped">Stone Wrapped</SelectItem>
              <SelectItem value="aluminum">Aluminum</SelectItem>
            </Select>
          </div>
          <div>
            <Label>Roofing Material</Label>
            <Select value={form.roofing} onChange={(value) => updateForm({ roofing: value })}>
              <SelectItem value="none">No Roofing</SelectItem>
              <SelectItem value="metal">Metal</SelectItem>
              <SelectItem value="polycarbonate">Polycarbonate</SelectItem>
              <SelectItem value="aluminum">Aluminum</SelectItem>
              <SelectItem value="shingles">Shingles</SelectItem>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="attached"
            checked={form.attachedToHouse}
            onCheckedChange={(checked) => updateForm({ attachedToHouse: checked as boolean })}
          />
          <Label htmlFor="attached">Attached to House</Label>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Electrical</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Fans</Label>
            <Input 
              type="number"
              min="0"
              value={form.electrical.fans}
              onChange={(e) => updateElectrical('fans', parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Lights</Label>
            <Input 
              type="number"
              min="0"
              value={form.electrical.lights}
              onChange={(e) => updateElectrical('lights', parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Outlets</Label>
            <Input 
              type="number"
              min="0"
              value={form.electrical.outlets}
              onChange={(e) => updateElectrical('outlets', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverheadStructureForm;