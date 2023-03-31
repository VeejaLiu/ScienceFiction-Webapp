import React from 'react';
import './Tag.css';

function Tag(props: { text?: string, href?: string }) {
    return (
        <a className='tag' href={props.href || '#'}>
            {props.text || 'tag'}
        </a>
    );
}

export default Tag;
