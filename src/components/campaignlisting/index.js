import { h } from "preact";
import style from "../style";

const CampaignListing = props => {
  let { project, currentBanner } = props;
  if (!project) {
    return null;
  }
  const result = [];
  const sets = Object.keys(project.banners);

  return (
    <div>
      {sets.map(set => {
        const bannerNames = Object.keys(project.banners[set]);
        return [
          <h3>{set}</h3>,
          <ul>
            {bannerNames.map((bannerName, index) => {
              const banner = project.banners[set][bannerName];
              if (index === 0 && !currentBanner) {
                currentBanner = banner;
              }
              const isCurrent = banner.file === currentBanner.file;
              return (
                <li>
                  <a
                    class={isCurrent ? style.isActive : ""}
                    href={`#${banner.file}`}
                    onClick={() => {
                      props.setCurrentBanner({
                        ...banner,
                        baseUrl: bannerName
                      });
                    }}
                  >
                    {bannerName}
                  </a>
                </li>
              );
            })}
          </ul>
        ];
      })}
    </div>
  );
};

export default CampaignListing;
