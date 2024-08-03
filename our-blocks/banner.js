
import apiFetch from '@wordpress/api-fetch';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {Button, PanelBody, PanelRow} from '@wordpress/components';
import React, {useEffect} from 'react';

const EditComponent = ({attributes, setAttributes}) => {

    const {imgID, imgUrl} = attributes;

    useEffect(()=> {
        if(imgID) {
            async function go(){
                const response = await apiFetch({
                    path:`wp/v2/media/${imgID}`,
                    method:"GET"
                });
                setAttributes({imgUrl:response.source_url})
            }
            go()
        }
    }, [imgID])

    const onFileSelect = (x) => {
        setAttributes({imgID:x.id});
        console.log(x);
    }

    return( <>
        <InspectorControls>
             
            <PanelBody title='Background' initialOpen={true}>
                <PanelRow>
                    <MediaUploadCheck>
                        <MediaUpload onSelect={onFileSelect} value={imgID} render={({open}) => {
                            return <Button onClick={open}>Choose Image</Button>
                        }}/>
                    </MediaUploadCheck>
                </PanelRow>
            </PanelBody>
        </InspectorControls>
        <div className="page-banner">
            <div className="page-banner__bg-image" style={{ backgroundImage: `url('${imgUrl}')` }}></div>
            <div className="page-banner__content container t-center c-white">
                <InnerBlocks allowedBlocks={["ourblocktheme/genericheading", "ourblocktheme/genericbutton"]} />
            </div>
        </div>
    </>)

}

const SaveComponent = () => {
    return <InnerBlocks.Content />
}


registerBlockType("ourblocktheme/banner", {
    title: __('Banner', 'ourblocktheme'),
    icon: 'format-image',
    category: 'layout',
    supports: {
        align: ['full']
    },
    attributes: {
        align: { type: "string", default: "full" },
        imgID:{type:"number"},
        imgUrl:{type: "string", default:banner.fallbackimage}
    },
    edit: EditComponent,
    save: SaveComponent
})