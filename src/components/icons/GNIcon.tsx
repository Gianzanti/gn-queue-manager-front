import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22.508109 10.494251' {...props}>
            <defs>
                <clipPath clipPathUnits='userSpaceOnUse'>
                    <path d='M42.55 301.27h63.123v29.15H42.55z' />
                </clipPath>
            </defs>
            <g
                fill='#e8711f'
                fillOpacity={1}
                fillRule='nonzero'
                stroke='none'
                strokeWidth={0.01506054}
            >
                <path
                    d='M95.659 170.56a.847.847 0 01-.603-.255l-6.82-6.795c-.105-.09-.271-.03-.271.12v6.044a.881.881 0 01-.845.887.861.861 0 01-.875-.857v-8.494c0-.301.15-.587.407-.752a.868.868 0 011.056.12l6.82 6.796c.105.105.271.03.271-.106v-6.058c0-.467.377-.872.845-.872a.849.849 0 01.875.841v8.495a.896.896 0 01-.422.767.911.911 0 01-.438.12M83.68 164.592h-2.534c-.468 0-.876.376-.876.842a.836.836 0 00.845.857h1.494c.12 0 .226.105.226.226v2.12c0 .12-.105.225-.226.225H79.47c-1.992 0-3.59-1.624-3.485-3.608a3.431 3.431 0 013.425-3.218h4.239c.483 0 .89-.36.89-.841a.849.849 0 00-.86-.857h-4.194c-2.746 0-5.07 2.12-5.205 4.87-.136 2.917 2.218 5.353 5.13 5.353h4.27c.482 0 .859-.391.859-.857v-4.255a.858.858 0 00-.86-.857'
                    transform='translate(-74.275 -160.067) translate(.132 -.132)'
                />
            </g>
        </svg>
    );
};

export default SvgComponent;
