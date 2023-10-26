import styles from './style.module.scss';

export default function Loading(props: {
    show: boolean;
}) {
    return props.show ? (
        <div className={styles.container}>
            <div className={['verticalCenter', styles.gif].join(' ')}>
                <img src="/images/pdf-generate.gif" alt="pdf generate animation" />
            </div>
        </div>
    ) : (
        <div />
    );
}
