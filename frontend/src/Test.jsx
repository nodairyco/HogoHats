import React, {useState} from 'react';
import {Slider, Stack} from "@mui/material";

function Test(props) {
    const [num, setNum] = useState(0)
    const handleChange = (event, newNum) => {
        setNum(newNum)
    }
    return (
        <div>
            <Stack>
                <Slider value={num} sx={{width: '80%'}} onChange={handleChange} aria-label='Price'
                        valueLabelDisplay={"auto"}
                        min={10} max={5000}
                        marks={[
                            {
                                value: 10,
                                label: '$10'
                            },
                            {
                                value: 5000,
                                label: '$5000'
                            }
                        ]}
                >

                </Slider>
            </Stack>
        </div>
    );
}

export default Test;