

import { ToolbarGroup, ToolbarButton, Popover, PanelBody, PanelRow, ColorPalette, Button } from "@wordpress/components";
import { RichText, BlockControls, __experimentalLinkControl as LinkControl, InspectorControls, getColorObjectByColorValue } from "@wordpress/block-editor";
import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import React from 'react';
import { button, link } from '../src/utils/icons';
import { color } from '@wordpress/icons';
import { ourColors } from '../inc/colors';


const EditComponent = ({ attributes, setAttributes }) => {
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState();
    const { text, size, linkObject, colorName } = attributes;


    const buttonHandler = () => {
        setIsLinkPickerVisible(isPrev => !isPrev);
    }



    const currentColorValue = ourColors?.filter(color => {
        return color.name == colorName
    })[0].color

    const handleColorChange = (colorCode) => {
        const { name } = getColorObjectByColorValue(ourColors, colorCode);
        setAttributes({ colorName: name });
    }

    return <>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton onClick={buttonHandler} icon={link} />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarButton isPressed={size === "large"} onClick={() => setAttributes({ size: "large" })}>Large</ToolbarButton>
                <ToolbarButton isPressed={size === "medium"} onClick={() => setAttributes({ size: "medium" })}>Medium</ToolbarButton>
                <ToolbarButton isPressed={size === "small"} onClick={() => setAttributes({ size: "small" })}>Small</ToolbarButton>
            </ToolbarGroup>
        </BlockControls>
        <InspectorControls>
            <PanelBody title='Title' initialOpen={false}>
                <PanelRow>
                    <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
        <RichText allowedFormats={[]} tagName='a' className={`btn btn--${size} btn--${colorName}`} value={text} onChange={(val) => setAttributes({ text: val })} />
        {isLinkPickerVisible && (
            <Popover position="middle center" onFocusOutside={() => setIsLinkPickerVisible(false)}>
                <LinkControl settings={[]} value={linkObject} onChange={(val) => setAttributes({ linkObject: val })} />
                <Button variant='primary' onClick={() => setIsLinkPickerVisible(false)} style={{ display: 'block', width: '100%' }} > Confirm </Button>
            </Popover>
        )}
    </>

}

const SaveComponent = ({ attributes }) => {
    const { text, size, linkObject, colorName } = attributes;
    console.log(colorName);

    return <a href={linkObject?.url} className={`btn btn--${size} btn--${colorName}`}>{text}</a>
}


registerBlockType("ourblocktheme/genericbutton", {
    title: __('Generic Button', 'ourblocktheme'),
    icon: button,
    attributes: {
        text: { type: "string" },
        size: { type: "string", default: "large" },
        linkObject: { type: "object", default: { url: "" } },
        colorName: { type: "string", default: "blue" }
    },
    edit: EditComponent,
    save: SaveComponent
})
