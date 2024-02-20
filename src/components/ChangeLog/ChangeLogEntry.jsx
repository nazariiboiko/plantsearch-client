import React from 'react';

const ChangeLogEntry = ({ props }) => {


    return (
        <div className="wrap-content">
            <section className="version d-flex">
                <h2 className="version-num text-decoration-underline">{props.version}</h2>
                <time className="datetime" dateTime={props.time}>
                    {props.time}
                </time>
            </section>
            <section className="log">
                {props.new_feature && (
                    <div>
                        <div className="badge badge-green">new</div>
                        <ul className='changelog-ul'>
                            {props.new_feature.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {props.update && (
                    <div>
                        <div className="badge badge-orange">update</div>
                        <ul className='changelog-ul'>
                            {props.update.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {props.fixed && (
                    <div>
                        <div className="badge badge-purple">fixed</div>
                        <ul className='changelog-ul'>
                            {props.fixed.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {props.deleted && (
                    <div>
                        <div className="badge badge-red">deleted</div>
                        <ul className='changelog-ul'>
                            {props.deleted.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
            <hr />
        </div>
    );
};

export default ChangeLogEntry;