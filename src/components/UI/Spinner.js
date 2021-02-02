import React from 'react';
const spinner=()=>(
    /*<div class="text-center">
        <div class="spinner-border"></div>
    </div>*/

    <div class="text-center">
        <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
);

export default spinner;