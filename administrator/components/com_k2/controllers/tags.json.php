<?php
/**
 * @version		3.0.0
 * @package		K2
 * @author		JoomlaWorks http://www.joomlaworks.net
 * @copyright	Copyright (c) 2006 - 2013 JoomlaWorks Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die ;

require_once JPATH_ADMINISTRATOR.'/components/com_k2/controller.php';

/**
 * Tags JSON controller.
 */

class K2ControllerTags extends K2Controller
{
	protected function checkPermissions($method)
	{
		$user = JFactory::getUser();
		return $user->authorise('k2.tags.manage', 'com_k2');
	}

}
