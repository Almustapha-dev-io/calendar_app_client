import { toast } from 'react-toastify';

const showToast = (msg, type) => toast(msg, {
    type,
    position: 'top-right'
});

export default showToast;