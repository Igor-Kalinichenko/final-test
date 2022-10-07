import { useGetProductsQuery } from '../redux/productsApi';
import {useGetCategoriesQuery} from '../redux/categoriesApi';
import {Row, NavDropdown, Nav, Spinner, Container} from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Product from './Product';
import SearchForm from './SearchForm';
import AlertContext from '../context/AlertContext';
import {ReactComponent as ShortArrow} from '../svg/short-arrow.svg';
import '../css/Products.css';

function Products ({point, sale, news}) {
    const {data: products, isLoading, isSuccess} = useGetProductsQuery();
    const {data: categories} = useGetCategoriesQuery();
    const [productsToRender, setProductsToRender] = useState([]);
    const [filteredBySale, setFilteredBySale] = useState(false);
    const [beforeSale, setBeforeSale] = useState([]);
    const [currentPoint, setCurrentPoint] = useState('');
    const [currentSale, setCurrenSale] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [showNew, setShowNew] = useState(false);
    const {setPoint, setSale, setNews} = useContext(AlertContext);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const searchQuery = searchParams.get('search') || '';

    const dateNow = Date.now();
    const sevenDaysAgo = dateNow - 604800000;

    useEffect(() => {
        if (point || sale) setProductsToRender(products?.filter(el => point ? el.point === point : el.sale === true));
            else if (news) setProductsToRender(products?.filter(el => el.date > sevenDaysAgo));
            else setProductsToRender(products);      
    },[isLoading, products]);

    useEffect(() => {
        if(point.length && isSuccess) {
            setProductsToRender(products?.filter(el => el.point === point));
            setCurrentPoint(point);
            setCurrenSale(false);
            setFilteredBySale(false);
            setShowNew(false);
            setPoint('');
            setCategoryName('');
        }
    },[point]);
    useEffect(() => {
        if(sale && isSuccess) {
            setProductsToRender(products?.filter(el => el.sale === true));
            setCurrenSale(true);
            setCurrentPoint('');
            setFilteredBySale(false);
            setSale(false);
            setShowNew(false);
            setCategoryName('');
        }
    },[sale]);

    useEffect(() => {
        if(news && isSuccess) {
            setProductsToRender(products?.filter(el => el.date > sevenDaysAgo));
            setCurrentPoint('');
            setShowNew(true);
            setFilteredBySale(false);
            setCurrenSale(false);
            setNews(false);
            setCategoryName('');
        }
    },[news]);
    
    const FilterByCategory = (category) => {
        setFilteredBySale(false);
        setCategoryName(category);
        if(currentPoint.length) {
            setProductsToRender(products?.filter(el => el.point === currentPoint)
            .filter(el => el.category.toLowerCase() === category.toLowerCase()));
        } else if(currentSale) {
            setProductsToRender(products?.filter(el => el.sale === true)
            .filter(el => el.category.toLowerCase() === category.toLowerCase()));
        } else {
            setProductsToRender(products?.filter(el => el.category.toLowerCase() === category.toLowerCase()));
        }
    }

    const AllProducts = () => {
        setProductsToRender(products);
        setCurrenSale(false);
        setCurrentPoint('');
        setFilteredBySale(false);
        setShowNew(false);
        setCategoryName('');
    }
    const filterCurrentBySale = () => {
        if(!filteredBySale) {
            setBeforeSale(productsToRender);
            setProductsToRender(productsToRender?.filter(el => el.sale === true));
            setFilteredBySale(true);
        } else {
            setProductsToRender(beforeSale);
            setFilteredBySale(false);
        }
    }
    const SortByLowerPrice = () => {
        const sortedProducts = productsToRender.slice().sort((a, b) => a.price - b.price);
        setProductsToRender(sortedProducts);
    }
    const SortByHigherPrice = () => {
        const sortedProducts = productsToRender.slice().sort((a, b) => b.price - a.price);
        setProductsToRender(sortedProducts);
    }
    const searchProducts = (query) => {
        console.log(query);
        const filteredProducts = productsToRender?.filter(el => el.model?.toLowerCase().includes(query?.toLowerCase().trim()));
        setProductsToRender(filteredProducts);
    }
    return <><Container>
    
    <div className='mt-3 d-inline-block'>
        <h6 className='text-uppercase' onClick={AllProducts}><span className='all-products'>Усі товари </span>
        <ShortArrow /> {currentPoint || ''} {currentSale ? 'SALE' : ''} {showNew ? 'Новинки' : ''}</h6>
    </div>
    <div className='d-flex flex-wrap align-items-center'>
        <Nav.Link onClick={filterCurrentBySale} className={`${!filteredBySale ? 'bg-secondary' : 'bg-danger'} mx-2 px-3 py-2 text-light`}>SALE</Nav.Link>
        <NavDropdown title="Сортування" className='mx-2 p-2 bg-secondary text-light'>
            <NavDropdown.Item onClick={SortByLowerPrice}>Спочатку дешевші</NavDropdown.Item>
            <NavDropdown.Item onClick={SortByHigherPrice}>Спочатку дорожчі</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title={`${categoryName ? categoryName : 'Категорії'}`} className='mx-2 p-2 bg-secondary text-light text-capitalize'>
            {categories?.map(el => <NavDropdown.Item className='text-capitalize' key={el.id} onClick={() => FilterByCategory(el.name)}>{el.name}</NavDropdown.Item>)}
        </NavDropdown>
        <SearchForm searchQuery={searchQuery} setSearchParams={setSearchParams} searchProducts={searchProducts}/>
    </div>
    { isLoading && <><div className='text-center my-5'><Spinner animation="border" variant="success" /></div></> }
    {productsToRender?.length ? (<><div>{`${productsToRender?.length} товарів`}</div>
    <Row>{productsToRender?.map(product => <Product key={product.id} product={product} />)}</Row></>) : 
    <Row><h4 className='text-center'>На жаль товарів не знайдено</h4></Row>}
    </Container>
    </>
}

export default Products;