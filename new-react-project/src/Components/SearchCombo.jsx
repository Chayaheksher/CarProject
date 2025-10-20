import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from "primereact/autocomplete";
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import '../Styles/SearchStyle.css';

export const SearchCombo = ({ filters, fetchFilterData, filterData, fetchResultsFromServer }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (selectedFilter !== null) {
            fetchFilterData(selectedFilter);
        }
    }, [selectedFilter]);

    useEffect(() => {
        setItems(filterData);
        console.log(filterData, "search")
    }, [filterData]);

    const search = (event) => {
        if (selectedFilter==null) {
            setItems([]);
            return;
        }

        const query = event.query.toLowerCase();
        if (filterData && Array.isArray(filterData)) {
            const filteredItems = filterData.filter(item =>
                typeof item === 'string' && item.toLowerCase().includes(query)
            );
            setItems(filteredItems);
        } else {
            setItems([event.query]);
        }
    };

    const handleSelect = (item) => {
        setValue(item);
    };

    const executeFilter = () => {
        if (value) {
            fetchResultsFromServer(selectedFilter, value);
        }
    };

    const clearFilter = () => {
        setSelectedFilter(null);
        setValue('');
        setItems(filterData);
        fetchResultsFromServer(null, '');
    };

    return (
        <>
            <div className="search">
                <Dropdown
                    value={selectedFilter}
                    onChange={(e) => { setSelectedFilter(e.value); setValue(''); }}
                    options={filters}
                    optionLabel="label"
                    placeholder="סנן לפי"
                    optionValue="value"
                    style={{ direction: "rtl" }}
                />
                <AutoComplete
                    value={value}
                    suggestions={items}
                    completeMethod={search}
                    onChange={(e) => setValue(e.value)}
                    onSelect={(e) => handleSelect(e.value)}
                    placeholder="הקלד לחיפוש..."
                    style={{ direction: "rtl" }}
                    disabled={selectedFilter == null}
                />
                <Tooltip target=".filter-button" content="סנן" position="top"/>
                <Button 
                    label=" "
                    icon="pi pi-check"
                    className="p-button-rounded p-button-text filter-button" 
                    onClick={executeFilter}
                />
                <Tooltip target=".clear-button" content="נקה סינונים" position="top"/> 
                <Button 
                    label=" "
                    icon="pi pi-times" 
                    className="p-button-rounded p-button-text clear-button" 
                    onClick={clearFilter} 
                />
            </div>
        </>
    );
};
