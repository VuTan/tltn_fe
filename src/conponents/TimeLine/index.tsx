import React, {useEffect, useState} from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClock, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField
} from '@mui/material';
import {useSession} from "next-auth/react";
import dayjs from "dayjs";
import {handleUpdateItemOrder} from "@/utils/actions";

// Define status types
const STATUS_TYPES = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
};

// Define predefined timeline steps
const PREDEFINED_STEPS = [
    {title: 'Packaging', description: 'Product is being packaged'},
    {title: 'Quality Check', description: 'Ensuring product quality'},
    {title: 'Delivering', description: 'Order is out for delivery'},
    {title: 'Delivered', description: 'Order has been delivered'},
    {title: 'Return Process', description: 'Processing return request'},
    {title: 'Refund Initiated', description: 'Refund is being processed'}
];

// Define icon mapping
const STATUS_ICONS = {
    [STATUS_TYPES.PENDING]: faClock,
    [STATUS_TYPES.IN_PROGRESS]: faSpinner,
    [STATUS_TYPES.COMPLETED]: faCheck
};

export default function CustomizedTimeline({order}) {
    const addStatusToSteps = (steps) => {
        if (!Array.isArray(steps)) return [];
        return steps.map((step, index) => {
            return {
                ...step,
                status: index === steps.length - 1 ? STATUS_TYPES.IN_PROGRESS : STATUS_TYPES.COMPLETED,
            };
        });
    };
    // Use session for authentication
    const {data: session} = useSession();

    // State for timeline steps
    const [timelineSteps, setTimelineSteps] = useState();
    useEffect(() => {
        if (order?.status) {
            const updatedSteps = addStatusToSteps(order.status);
            setTimelineSteps(updatedSteps);
        }
    }, [order?.status]);

    // State for dialogs and notifications
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // State for new step
    const [newStep, setNewStep] = useState({
        title: '',
        description: '',
        time: new dayjs().format('hh:mm'),
        status: STATUS_TYPES.IN_PROGRESS
    });

    // Add new timeline step
    const handleAddStep = () => {
        // Mark previous steps as complete
        const updatedPreviousSteps = timelineSteps.map(step => ({
            ...step,
            status: STATUS_TYPES.COMPLETED
        }));

        // Add new step
        const newTimelineStep = {
            id: timelineSteps.length + 1,
            ...newStep
        };

        setTimelineSteps([...updatedPreviousSteps, newTimelineStep]);
        setOpenAddDialog(false);

        // Reset new step state
        setNewStep({
            title: '',
            description: '',
            time: new dayjs().format('HH:mm'),
            status: STATUS_TYPES.IN_PROGRESS
        });
    };

    // Save timeline to backend
    const handleSaveTimeline = async () => {
        try {
            // Prepare timeline data for saving
            const timelineData = {
                _id: order?._id,
                status: timelineSteps.map(step => ({
                    title: step.title,
                    description: step.description,
                    time: step.time,
                }))
            };

            // Make API call to save timeline
            const res = await handleUpdateItemOrder(timelineData)
            console.log(res)
            // Show success message
            setSnackbarMessage('Timeline saved successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            // Handle error
            console.error('Failed to save timeline:', error);
            setSnackbarMessage('Failed to save timeline. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Timeline position="right">
                {timelineSteps?.map((step) => (
                    <TimelineItem key={step.id}>
                        <TimelineOppositeContent className='m-auto text-sm font-light text-gray-500'>
                            {step.time}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector/>
                            <TimelineDot
                                color={
                                    step.status === STATUS_TYPES.COMPLETED ? "success" :
                                        step.status === STATUS_TYPES.IN_PROGRESS ? "warning" :
                                            "secondary"
                                }
                            >
                                <FontAwesomeIcon
                                    icon={STATUS_ICONS[step.status]}
                                    size="sm"
                                />
                            </TimelineDot>
                            <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent sx={{py: '12px', px: 2}}>
                            <Typography className='text-lg font-bold'>
                                {step.title}
                            </Typography>
                            <Typography>{step.description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenAddDialog(true)}
                >
                    Add New Step
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSaveTimeline}
                >
                    Save Changes
                </Button>
            </div>

            {/* Add Step Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add New Timeline Step</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Select Step</InputLabel>
                        <Select
                            value={newStep.title}
                            label="Select Step"
                            onChange={(e) => {
                                const selectedStep = PREDEFINED_STEPS.find(step => step.title === e.target.value);
                                setNewStep({
                                    ...newStep,
                                    title: selectedStep.title,
                                    description: selectedStep.description
                                });
                            }}
                        >
                            {PREDEFINED_STEPS.map((step) => (
                                <MenuItem key={step.title} value={step.title}>
                                    {step.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={newStep.description}
                        onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Time"
                        fullWidth
                        value={newStep.time}
                        onChange={(e) => setNewStep({...newStep, time: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddStep} color="primary">Add Step</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{width: '100%'}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}