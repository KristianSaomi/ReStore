using API.Entities.Enum;
using API.Item.Enum;
using System.Text.Json.Serialization;

namespace API.Entities;

public class ItemObject
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string Desc { get; set; }
    public int SortOrder => Status == Status.Planerat ? 1 : Status == Status.Pågående ? 2 : Status == Status.Testar ? 3 : 4;
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Tag Tag { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Status Status { get; set; }
}

