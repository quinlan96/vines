import React from 'react';
import Vine from './Vine';
import IVine from '../../entities/Vine';

interface VineGridProps {
    vines: IVine[];
}

const VineGrid: React.FC<VineGridProps> = ({ vines }) => (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mx-4 md:m-0">
        { vines.map((vine) => <Vine key={vine.id} data={vine} />) }
    </div>
);

export default VineGrid;