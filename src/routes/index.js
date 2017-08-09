
import ProExtensionView from '../components/proExtensionView';
import JdHomeView from '../components/home';
import ShopReportView from '../components/shopReport';
export const routes = [
	{
		path: '/',
		exact: true,
		component: JdHomeView
	},
	{
		path: '/ware',
		component: ProExtensionView
	},
	{
		path: '/report',
		component: ShopReportView
	}
]
