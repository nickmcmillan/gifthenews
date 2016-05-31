
export default function stripUntilDash(str) {
 	if (str) {
		return str.replace(/^[^-]*-/, '').trim();
	}
}
