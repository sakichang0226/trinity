import Categories from '@/src/types/Categories';
import BreadCrumb from '../common/BreadCrumb';

const CategoryTree = (props: Categories) => {

    const categoryTree = [...props?.parentCategories].reverse()

    return (
        <nav className="flex text-sm font-normal font-body">
            <ol className="flex md:flex-wrap">
                { categoryTree.map((category, id) => (
                    <li key={id}>
                        <BreadCrumb text={category.name} ></BreadCrumb>
                    </li>
                    )
                )}
                <BreadCrumb text={props.name} isNext={false} ></BreadCrumb>
            </ol>
        </nav>
    );
}
export default CategoryTree;
