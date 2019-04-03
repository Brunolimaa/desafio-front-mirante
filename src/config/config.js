export default function decodeToken(token){
	if(token != null)
		var p = JSON.parse(atob(token.split('.')[1]));
		return p;
	return null;
};
