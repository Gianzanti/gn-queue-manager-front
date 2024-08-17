import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg viewBox='0 -0.5 25 25' xmlns='http://www.w3.org/2000/svg' {...props}>
            <path
                clipRule='evenodd'
                d='M18.168 19.003a4.183 4.183 0 004.332-4.017V9.02a4.183 4.183 0 00-4.332-4.017H6.832A4.183 4.183 0 002.5 9.02v5.966a4.183 4.183 0 004.332 4.017h11.336z'
                stroke='#000'
                strokeWidth={1.5}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                clipRule='evenodd'
                d='M12.008 9.178l3.161 2.148a.667.667 0 010 1.152l-3.161 2.35c-.6.407-1.508.06-1.508-.576v-4.5c0-.633.909-.981 1.508-.574z'
                stroke='#000'
                strokeWidth={1.5}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

export default SvgComponent;
