export const Stats = () => {
  const stats = [
    { id: 1, name: "Transactions every 24 hours", value: "44 million" },
    { id: 2, name: "Assets under holding", value: "$119 trillion" },
    { id: 3, name: "New users annually", value: "46,000" },
  ];
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
export const Stats_2 = () => {
  const stats = [
    {
      id: 1,
      name: "CUSTOMERS",
      value: "480K",
    },
    {
      id: 2,
      name: "WORKERS",
      value: "110K",
    },
    {
      id: 3,
      name: "FLEETS",
      value: "1200",
    },
  ];
  return (
    <div className="flex flex-wrap text-white my-8 justify-between">
      {stats.map((stat) => (
        <div key={stat.id} className="flex max-w-xs flex-col gap-y-4">
          <div className="text-4xl font-bold italic">
            {stat.value}
            <span className="text-[#36B7FF]"> +</span>
          </div>
          <div className="text-sm font-extralight">{stat.name}</div>
        </div>
      ))}
    </div>
  );
};
