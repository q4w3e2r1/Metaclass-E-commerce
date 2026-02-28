
import { useEffect, useMemo, useState } from 'react'

import { Button, Input, MultiDropdown } from '@components'

import styles from './CatalogSerach.module.scss'
import { useProductCategories } from '@/hooks/categories/useProductCategories';
import { useSearchParams } from "react-router-dom";

export type Option = {
    key: string;
    value: string;
  };
  
export const CatalogSearch = () => {

    const [searchValue, setSearchValue] = useState('')
    const { data, isLoading } = useProductCategories();
    const [searchParams, setSearchParams] = useSearchParams();
    

    const categoryMap = useMemo(() => {
        if (!data?.items) return new Map<number, string>();
      
        return new Map(
          data.items.map((c) => [c.id, c.title])
        );
      }, [data]);
    
    const categoryOptions: Option[] = useMemo(() => {
        return Array.from(categoryMap.entries()).map(([id, title]) => ({
          key: String(id),
          value: title,
        }));
    }, [categoryMap]);

    const categoriesParam = searchParams.get("categories");

    const selectedIds = useMemo(() => {
    return categoriesParam ? categoriesParam.split(",") : [];
    }, [categoriesParam]);

    const selectedCategories: Option[] = useMemo(() => {
        return selectedIds
          .map((id) => {
            const title = categoryMap.get(Number(id));
            if (!title) return null;
      
            return {
              key: id,
              value: title,
            };
          })
          .filter(Boolean) as Option[];
    }, [selectedIds, categoryMap]);

    const getCategoriesTitle = (selected: Option[]): string => {
        if (selected.length === 0) {
            return 'Все категории'
        }
        if (selected.length === 1) {
            return selected[0].value
        }
        return `Выбрано: ${selected.length}`
    }

    const handleCategoriesChange = (selected: Option[]) => {
        const newParams = new URLSearchParams(searchParams);
      
        if (!selected.length) {
          newParams.delete("categories");
        } else {
          newParams.set(
            "categories",
            selected.map((o) => o.key).join(",")
          );
        }
      
        setSearchParams(newParams);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
    }

    const handleSearchSubmit = () => {
        console.log("Searching for:", searchValue)
    }

    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <Input 
                    value={searchValue}
                    placeholder='Search product' 
                    onChange={handleSearchChange}
                />
                <Button onClick={handleSearchSubmit}>Find now</Button>
            </div>
            <div className={styles.categories}>
            <MultiDropdown
                    options={categoryOptions}
                    value={selectedCategories}
                    onChange={handleCategoriesChange}
                    getTitle={getCategoriesTitle}
                    placeholder="Выберите категории"
                />
            </div>
        </div>
    )
}

export default CatalogSearch