

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import React from 'react';


const EditComponent = () => {

    const useMeLeter = <>
        <h1 className="headline headline--large">Welcome!</h1>
        <h2 className="headline headline--medium">We think you&rsquo;ll like it here.</h2>
        <h3 className="headline headline--small">
            Why don&rsquo;t you check out the <strong>major</strong> you&rsquo;re interested in?
        </h3>
        <a href="#" className="btn btn--large btn--blue">
            Find Your Major
        </a>
    </>

    return <div className="page-banner">
        <div className="page-banner__bg-image" style={{ backgroundImage: "url('/wordpress/wp-content/themes/fictional-university-block-theme/images/library-hero.jpg')" }}></div>
        <div className="page-banner__content container t-center c-white">
            <InnerBlocks allowedBlocks={["ourblocktheme/genericheading", "ourblocktheme/genericbutton"]} />
        </div>
    </div>

}

const SaveComponent = () => {
    return <div className="page-banner">
        <div className="page-banner__bg-image" style={{ backgroundImage: "url('/wordpress/wp-content/themes/fictional-university-block-theme/images/library-hero.jpg')" }}></div>
        <div className="page-banner__content container t-center c-white">
            <InnerBlocks.Content />
        </div>
    </div>
}


registerBlockType("ourblocktheme/banner", {
    title: __('Banner', 'ourblocktheme'),
    icon: 'format-image',
    category: 'layout',
    supports: {
        align: ['full']
    },
    attributes: {
        align: { type: "string", default: "full" }
    },
    edit: EditComponent,
    save: SaveComponent
})