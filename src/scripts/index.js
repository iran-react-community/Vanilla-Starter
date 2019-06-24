import styles from '../styles/styles.pcss'

const timer = document.getElementsByClassName("timer")[0];
setInterval(() => {
  const date = new Date();
  timer.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}, 1000);
