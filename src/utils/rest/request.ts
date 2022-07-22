import { Request } from 'express';
import URLParams from './urlparams';

/**
 * Interface to add extra modifiers to request.
 */
export default interface RequestWithUser extends Request {
	// To use userId and role, please inject the same in a middleware, by decoding an access token.
	role?: string;
	startTime?: number;
	userAgent?: { [key: string]: any };
	searchParams?: URLParams;
	appName: string;
}
