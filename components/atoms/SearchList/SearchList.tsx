import React from 'react'
import Link from "next/link"

type SearchListProps = {
    id:number
    name:string
    state:string
    country:string
}


const SearchList:React.FC<SearchListProps> = ({...city}) => {
    return (
        <li key={city.id}>
          <Link
            href={{
              pathname: `/location/${city.id}`,
            }}
          >
            <div className=" hover:opacity-75">
              {city.name}
              {city.state ? `, ${city.state}` : ""}{" "}
              <span>({city.country})</span>
            </div>
          </Link>
        </li>
      );
}

export default SearchList