import React from 'react';
import { WaveLoading } from 'react-loadingg';
const WaveLoader = () => {
    return(
    <div class="text-center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    );
}
export default WaveLoader;