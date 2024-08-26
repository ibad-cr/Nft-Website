import React from 'react'

const HomeProductsSlice = ({ alldata }) => {
    return (
        <div className=''>
            <div className="col">
                <div className="card">
                    <img src={alldata.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a longer card with supporting text.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeProductsSlice