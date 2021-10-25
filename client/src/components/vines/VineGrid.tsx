import React from 'react';
import Vine from './Vine';
import IVine from '../../entities/Vine';

interface VineGridProps {
    vines: IVine[];
}

const VineGrid: React.FC<VineGridProps> = ({ vines }) => (
    <div className="grid grid-cols-4 gap-4">
        { vines.map((vine) => <Vine key={vine.id} data={vine} />) }
    </div>
);

export default VineGrid;