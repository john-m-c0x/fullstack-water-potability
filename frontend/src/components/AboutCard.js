import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardContent, Button, CardActions, CardMedia } from '@mui/material';

export default function AboutCard({
    primaryText,
    secondaryText,
    description,
    image,
    isLinkEnabled,
    buttonText,
    onButtonClick
}) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {primaryText}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {secondaryText}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                {image && (
                    <CardMedia
                        component="img"
                        height="120"
                        image={image}
                        alt={primaryText}
                    />
                )}
            </CardContent>
            {isLinkEnabled && (
                <CardActions>
                    <Button size="small" onClick={onButtonClick}>
                        {buttonText}
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}

AboutCard.propTypes = {
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    isLinkEnabled: PropTypes.bool.isRequired,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func,
}