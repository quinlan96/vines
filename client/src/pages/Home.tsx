import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VineGrid from '../components/vines/VineGrid';
import { fetchVines, selectVines } from '../reducers/vine';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const vines = useSelector(selectVines);

    useEffect(() => {
        dispatch(fetchVines());
    }, [dispatch]);

    console.log(vines);

    return (
        <div className="container mx-auto">
            <VineGrid vines={vines} />
        </div>
    );
};

export default Home;
