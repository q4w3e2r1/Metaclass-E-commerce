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
    const searchParam = searchParams.get("search") ?? "";

    useEffect(() => {
      setSearchValue(searchParam);
    }, [searchParam]);

    const categoryMap = useMemo(() => {
        if (!data?.items) return new Map<number, string>();
        return new Map(data.items.map((c) => [c.id, c.title]));
    }, [data]);
    
    const categoryOptions = useMemo(() => {
        return Array.from(categoryMap.entries()).map(([id, title]) => ({
          key: String(id),
          value: title,
        }));
    }, [categoryMap]);

    const categoriesParam = searchParams.get("categories");
    const selectedIds = useMemo(() => {
        return categoriesParam ? categoriesParam.split(",") : [];
    }, [categoriesParam]);

    const selectedCategories = useMemo(() => {
        const result: Option[] = [];
        
        selectedIds.forEach((id) => {
          const title = categoryMap.get(Number(id));
          if (title) {
            result.push({ key: id, value: title });
          }
        });
        
        return result;
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
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            
            if (!selected.length) {
                params.delete("categories");
            } else {
                params.set(
                    "categories",
                    selected.map((o) => o.key).join(",")
                );
            }
            
            params.delete("page");
            
            return params;
        });
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
    }

    const handleSearchSubmit = () => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            
            if (!searchValue.trim()) {
                params.delete("search");
            } else {
                params.set("search", searchValue.trim());
            }
            
            params.delete("page");
            
            return params;
        });
    };

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