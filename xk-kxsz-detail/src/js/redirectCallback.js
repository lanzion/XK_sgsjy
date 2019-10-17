// import { pages } from './common-config.js'

const redirectCallback = (path) => {
    window.location.href = `${path}?callback=${encodeURIComponent(window.location.href)}`
}
export default redirectCallback