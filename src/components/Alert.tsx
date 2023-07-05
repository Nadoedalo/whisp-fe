import { observer } from "mobx-react-lite";
import styles from '../app/alert.module.scss';
import { errorStore } from "@/store/";
import Alert from 'react-bootstrap/Alert';

export const AlertContainer = observer(() => {
    const { errorQueue } = errorStore;
    return <div className={styles.alert}>
        {
            errorQueue.map((err) => {
                return <Alert key={err.id} variant={err.errorType} className={styles.alertMessage}>{err.errorText}</Alert>
            })
        }
    </div>;
});