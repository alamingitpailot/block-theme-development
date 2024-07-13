
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { RichText, BlockControls } from "@wordpress/block-editor";
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import React from 'react';
import { headingIcon } from '../src/utils/icons';


const EditComponent = ({ attributes, setAttributes }) => {
    const { text, size } = attributes;
    console.log(size);

    return <>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton isPressed={size === "large"} onClick={() => setAttributes({ size: "large" })}>Large</ToolbarButton>
                <ToolbarButton isPressed={size === "medium"} onClick={() => setAttributes({ size: "medium" })}>Medium</ToolbarButton>
                <ToolbarButton isPressed={size === "small"} onClick={() => setAttributes({ size: "small" })}>Small</ToolbarButton>
            </ToolbarGroup>
        </BlockControls>
        <RichText allowedFormats={["core/bold", "core/italic"]} tagName='h1' className={`headline headline--${size}`} value={text} onChange={(val) => setAttributes({ text: val })} />
    </>

}

const SaveComponent = ({ attributes }) => {
    const { text, size } = attributes;

    const createTagName = () => {
        switch (size) {
            case "large":
                return "h1"
            case "medium":
                return "h2"
            case "small":
                return "h3"
        }
    }
    return <RichText.Content tagName={createTagName()} value={text} className={`headline headline--${size}`} />
}


registerBlockType("ourblocktheme/genericheading", {
    title: __('Generic Heading', 'ourblocktheme'),
    icon: headingIcon,
    attributes: {
        text: { type: "string" },
        size: { type: "string", default: "large" }
    },
    edit: EditComponent,
    save: SaveComponent
})
