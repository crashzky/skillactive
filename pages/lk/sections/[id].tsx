import EditSectionLayout from '../../../layouts/EditSectionLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const SectionIdPage = (): JSX.Element => {
	return (
		<div>
			[id]
		</div>
	);
};

export default withCheckAuthLayout(SectionIdPage);
